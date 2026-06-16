export default function ReviewBanner() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-accent px-8 py-10 text-accent-content">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/people.jpg')" }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-lg">
        <h2 className="text-2xl font-semibold">Leave Us A Review</h2>
        <p className="mt-2 text-accent-content/70">
          Add your take to the hundreds of testimonials we've received.
        </p>
        <button
          type="button"
          className="mt-6 rounded-sm bg-secondary px-6 py-3 text-sm font-medium text-secondary-content transition-colors hover:bg-secondary/90"
        >
          Write a Review
        </button>
      </div>
    </div>
  );
}
