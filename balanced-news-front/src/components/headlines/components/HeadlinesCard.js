import HeadlineImage from "./HeadlineImage";
import HeadlinesArticles from "./HeadlinesArticles";

function HeadlinesCard({ data, color }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "16px",
        width: "100%",
        alignItems: "flex-start",
      }}
    >
      <div style={{ flex: 1 }}>
        <HeadlinesArticles data={data} color={color} />
      </div>
      <div style={{ flex: 1 }}>
        <HeadlineImage data={data} color={color} />
      </div>
    </div>
  );
}

export default HeadlinesCard;
