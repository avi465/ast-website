"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2, Save, Radio, Archive } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CategoryOutput, Course, createCourse, fetchAllCategories, fetchCourses } from "@/service/course-service";

const createCourseSchema = z.object({
  name: z.string().min(3, "Name is required"),
  description: z.string().min(10, "Description is too short"),
  details: z.string().min(15, "Details is too short"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  discount: z.coerce.number().min(0, "Discount must be at least 0").max(100, "Discount cannot exceed 100"),
  category: z.string().min(1, "Category is required"),
  images: z.array(z.string()).optional(),
});

type CreateCourseSchema = z.infer<typeof createCourseSchema>;

export const EllipsedSelectItem = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectItem>) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      setIsTruncated(el.scrollWidth > el.clientWidth);
    }
  }, [children]);

  const item = (
    <SelectItem {...props} className={cn("max-w-full cursor-pointer truncate", className)}>
      <div ref={ref} className="truncate">
        {children}
      </div>
    </SelectItem>
  );

  if (!isTruncated) return item;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{item}</TooltipTrigger>
        <TooltipContent>{children}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export function CreateCourse() {
  const router = useRouter();

  const form = useForm<CreateCourseSchema>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      name: "",
      description: "",
      details: "",
      price: 0,
      discount: 0,
      category: "",
      images: [],
    },
  });

  const [onSaveLoading, setOnSaveLoading] = React.useState(false);
  const [onSaveAsDraftLoading, setOnSaveAsDraftLoading] = React.useState(false);
  const [categoryLoading, setCategoryLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const images = [
    { id: "none", name: "Select Image" },
    { id: "image1", name: "https://www.aws.north-ap2-amazonaws.com" },
    { id: "image2", name: "https://www.aws.north-ap2-amazonaws.com/static?id=233dfw32d32jksf8" },
  ];

  const createCourseMutation = useMutation({
    mutationFn: (course: Partial<Course>) =>
      createCourse({
        ...course,
      }),
    onSuccess: () => {
      router.push("/dashboard/course");
    },
    onError: (error: any) => {
      toast.error(error.message ?? "Failed to create course");
    },
  });

  // Fetch category
  const { data: categories = [] } = useQuery<CategoryOutput[] | null>({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
  });

  async function onSave(values: CreateCourseSchema) {
    try {
      setOnSaveLoading(true);
      await createCourseMutation.mutateAsync(values);
      toast.success("Course created successfully!");
      form.reset();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setOnSaveLoading(false);
    }
  }

  async function onSaveAsDraft(values: CreateCourseSchema) {
    try {
      setOnSaveAsDraftLoading(true);
      await createCourseMutation.mutateAsync(values);
      toast.success("Lesson saved as draft!");
      form.reset();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setOnSaveAsDraftLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Create Course</CardTitle>
            <CardDescription>Provide details to set up your new course.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => form.handleSubmit(onSave)()}
              disabled={onSaveLoading}
            >
              {onSaveLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Save className="mr-1 h-4 w-4" />
                  Save
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => form.handleSubmit(onSaveAsDraft)()}
              disabled={onSaveAsDraftLoading}
            >
              {onSaveAsDraftLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Archive className="mr-1 h-4 w-4" />
                  Save as Draft
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column (Form) */}
        <Card className="border shadow-none lg:col-span-2">
          <CardContent>
            <Form {...form}>
              <form className="space-y-6">
                {/* Course Fields */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter course name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea rows={3} placeholder="Brief course description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Details</FormLabel>
                      <FormControl>
                        <Textarea rows={4} placeholder="Enter detailed course content" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount (%)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Category */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange} disabled={categoryLoading}>
                          <FormControl>
                            <SelectTrigger className="w-full truncate">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories?.map(
                              (category) =>
                                category.isActive && (
                                  <EllipsedSelectItem key={category._id} value={category._id}>
                                    {category.name}
                                  </EllipsedSelectItem>
                                ),
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Image */}
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <Select value={field.value?.[0] ?? ""} onValueChange={(val) => field.onChange([val])}>
                          <FormControl>
                            <SelectTrigger className="w-full truncate">
                              <SelectValue placeholder="Select image" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)]">
                            {images.map((img) => (
                              <EllipsedSelectItem key={img.id} value={img.id}>
                                {img.name}
                              </EllipsedSelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-end gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                form.reset();
                router.push("/dashboard/course");
              }}
            >
              Cancel
            </Button>
            <Button type="button" onClick={() => form.handleSubmit(onSave)()} disabled={onSaveLoading}>
              {onSaveLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Save className="mr-1 h-4 w-4" />
                  Save Course
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Right Column (Preview / Placeholder) */}
        <Card className="hidden border shadow-none lg:block">
          <CardHeader>
            <CardTitle className="text-base">Preview</CardTitle>
            <CardDescription>Course preview will appear here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              After filling the form, you can show a live preview of the course details (title, description, image).
            </p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
