import "./Cover.css";

export interface CoverProps {
  id: number;
  imageSource?: string;
  title?: string;
  description?: string;
}

export default function Cover({
  id = 0,
  imageSource = "",
  title = "Title",
  description = "Description",
}: CoverProps) {
  return (
    <div
      className="cover"
      title={title}
      onClick={() => {
        console.log(id);
      }}
    >
      <img src={imageSource} alt={title} title={`Go to book: ${title}`} />
      <div className="cover-body">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
