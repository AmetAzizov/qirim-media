import NewsItemServer from "./NewsItemServer";
import NewsItemClient from "./NewsItemClient";

export default function  News() {
  return (
    <NewsItemClient>
        <NewsItemServer />
    </NewsItemClient>
  )
}
