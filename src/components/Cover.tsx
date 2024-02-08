import { useNavigate } from "react-router-dom";
import "./Cover.css";
import { CoverProps } from "./Interfaces";
import supabase from "../supabaseconfig";

export default function Cover({
  id = 0,
  imageSource = "",
  title = "Title",
  description = "Description",
  clicks = 0,
}: CoverProps) {
  const navigate = useNavigate();

  const handleClick = async () => {
    const { data, error } = await supabase
      .from("book")
      .update({ clicks: clicks + 1 })
      .eq("id", id)
      .select();

    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }

    navigate(`/book/${id}`);
  };

  return (
    <div className="cover" title={title} onClick={handleClick}>
      <img src={imageSource} alt={title} title={`Go to book: ${title}`} />
      <div className="cover-body">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
