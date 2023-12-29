import "./Cover.css";

interface CoverProps {
  imageSource?: string;
  title?: string;
  description?: string;
}

export default function Cover({
  imageSource = "",
  title = "Title",
  description = "Description",
}: CoverProps) {
  return (
    <div className="cover">
      <img src={imageSource} alt={title} title={title} />
      <div className="cover-body">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
