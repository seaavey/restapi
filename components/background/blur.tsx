export default function BackgroundBlur() {
    return (
        <div className="absolute inset-0 z-0">
            <div className="bg-primary/5 absolute top-20 left-10 h-64 w-64 rounded-full blur-3xl" />
            <div className="bg-secondary/5 absolute right-10 bottom-20 h-80 w-80 rounded-full blur-3xl" />
        </div>
    );
}
