export interface BookPage {
  id: number;
  name: string;
  image_url: string;
  book: number;
  is_cover: boolean;
  image_name: string;
}

export interface BookProps {
  id: number;
  title: string;
  description: string;
}
export interface CoverProps {
  id: number;
  imageSource?: string;
  title?: string;
  description?: string;
}
