import { Search, XIcon } from "lucide-react";
import type { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
interface SearchProps {
  search: string | null;
  setSearch: (val: string | null) => void;
  clear: () => void;
}

interface ContainerRowProps extends PropsWithChildren {
  searchProps?: SearchProps;
  showSearch?: boolean;
}

export default function ContainerRow(props: ContainerRowProps) {
  const { search, setSearch, clear } = props.searchProps || {}; // Provide a default empty object
  const form = useForm({
    defaultValues: {
      search: search || "", // Initialize with existing search value if available
    },
  });
  return (
    <div className=" shadow-md rounded-b-box ring ring-current/20  lg:min-h-16 px-2 bg-base-100 flex  flex-col md:flex-row gap-2  md:items-end py-2">
      {props.showSearch && (
        <form
          className="min-w-xs join flex-1 "
          onSubmit={form.handleSubmit((data) => {
            if (setSearch) {
              // Only call setSearch if it exists
              setSearch(data.search);
            }
          })}
        >
          <div className="gap-2 w-full lg:w-auto">
            <label className="fieldset-label">Search</label>
            <input
              {...form.register("search")}
              className="input join-item text-sm flex-1"
              placeholder="Search...."
            />
          </div>
          <button className="btn btn-primary mt-auto btn-square  join-item ">
            <Search />
          </button>
          {search && search.length > 0 && (
            <button
              className="btn btn-error btn-soft btn-square join-item "
              onClick={() => {
                if (clear) {
                  clear();
                }
                form.setValue("search", "");
              }}
            >
              <XIcon />
            </button>
          )}
        </form>
      )}
      <div className={"flex gap-2 w-full lg:w-auto lg:items-end"}>
        {props.children}
      </div>
    </div>
  );
}
