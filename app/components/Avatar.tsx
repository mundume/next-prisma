export default function Avatar({ image }: { image: string }) {
  return (
    <div className="flex items-center avatar">
      <div className="w-12 border rounded-full">
        <img src={image} alt="null" />
      </div>
    </div>
  );
}
