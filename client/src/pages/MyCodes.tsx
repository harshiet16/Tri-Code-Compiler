import CodeItem from "@/components/CodeItem";
import { useGetMyCodesQuery } from "@/redux/slices/api";
import { Link } from "react-router-dom";

export default function MyCodes() {
  const { data: myCodes } = useGetMyCodesQuery();

  return (
    <div className="min-h-[calc(100dvh-60px)] bg-background">
      <div className="p-4 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">My Codes</h1>
        <p className="text-sm text-muted-foreground">All your saved code snippets</p>
      </div>
      {myCodes?.length !== 0 ? (
        <div className="p-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
          {myCodes?.map((item) => {
            return <CodeItem deleteBtn={true} key={item._id} data={item} />;
          })}
        </div>
      ) : (
        <p className="text-center font-mono text-muted-foreground p-8">
          You don't have any saved codes.{" "}
          <Link className="text-primary font-bold hover:underline" to="/compiler">Create One</Link>
        </p>
      )}
    </div>
  );
}
