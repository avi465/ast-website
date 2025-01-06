// components/LoadingSpinner.js
export default function LoadingSpinner() {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-white flex justify-center items-center z-50">
            <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
        </div>
    );
}