export default function Avatar({
  image,
  name,
}: {
  image: string;
  name: string;
}) {
  return (
    <div className="flex items-center m-0 avatar">
      <div className="w-12 border rounded-full">
        <img src={image} alt={name} />
      </div>
    </div>
  );
}
