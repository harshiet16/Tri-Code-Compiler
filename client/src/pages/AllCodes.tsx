import CodeItem from "@/components/CodeItem";
import { useGetAllCodesQuery } from "@/redux/slices/api";

export default function AllCodes() {
  const { data: allCodes } = useGetAllCodesQuery();

  return (
    <div className="min-h-[calc(100dvh-60px)] bg-background">
      <div className="p-4 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">All Codes</h1>
        <p className="text-sm text-muted-foreground">Browse all your saved code snippets</p>
      </div>
      {allCodes?.length !== 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 p-3">
          {allCodes?.map((codeItem) => (
            <CodeItem deleteBtn={false} key={codeItem._id} data={codeItem} />
          ))}
        </div>
      ) : (
        <p className="block w-full text-muted-foreground font-mono text-center p-8">
          No Codes Found!
        </p>
      )}
    </div>
  );
}
