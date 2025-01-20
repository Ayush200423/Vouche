"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Client } from "@/helpers/types/ClientType";

export const columns: ColumnDef<Client>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "client",
    header: "Client",
    cell: ({ row }) => (
      <div className="lowercase whitespace-nowrap overflow-hidden text-ellipsis max-w-[22ch]">
        {row.original.contact}
      </div>
    ),
  },
  {
    accessorKey: "referral_link",
    header: "Referral link",
    cell: ({ row }) => (
      <div className="lowercase whitespace-nowrap overflow-hidden text-ellipsis max-w-[22ch]">
        {row.original.link}
      </div>
    ),
  },
  {
    accessorKey: "total_referrals",
    header: "Total referrals",
    cell: ({ row }) => {
      const referrals = row.original.previous_referrals;
      const navigate = useNavigate();

      const handleClick = () => {
        const queryParams = referrals
          .map((referral) => referral.referralId)
          .join(",");
        const url = `/dashboard/referrals/archived?id=${queryParams}`;
        navigate(url);
      };
      return (
        <a
          className="font-normal cursor-pointer hover:underline"
          onClick={handleClick}
        >
          {row.original.previous_referrals.length} referrals
        </a>
      );
    },
  },
  {
    accessorKey: "available_rewards",
    header: ({}) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Available rewards</TooltipTrigger>
            <TooltipContent>
              <p>Unclaimed rewards</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[22ch]">
        {row.original.available_rewards
          ? row.original.available_rewards
              .map((reward) => {
                return reward.rewardType === "gift card"
                  ? `${reward.rewardValue} Gift Card`
                  : reward.rewardValue;
              })
              .join(" + ")
          : "-"}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const client = row.original;
      const referrals_made = client.previous_referrals;
      const navigate = useNavigate();

      const handleViewClaimedRewards = () => {
        const queryParams = referrals_made
          .map((referral) =>
            referral.rewards.map((reward) => reward.rewardId).join(",")
          )
          .join(",");
        const url = `/dashboard/rewards?id=${queryParams}`;
        navigate(url);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {}}
              disabled={client.available_rewards ? false : true}
            >
              Modify reward
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleViewClaimedRewards}>
              View claimed rewards
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>
              Resend referral link
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>
              Notify of rewards
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(client.clientId);
                toast({
                  description: "Client ID copied to clipboard.",
                });
              }}
            >
              Copy client ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface ClientTableProps {
  data: Client[];
}

export function ClientsTable({ data }: ClientTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [searchParams] = useSearchParams();
  const clientsParam = searchParams.get("id")?.split(",");

  const filteredData = React.useMemo(() => {
    if (clientsParam && clientsParam.length > 0) {
      return data.filter((client) => clientsParam.includes(client.clientId));
    }
    return data;
  }, [data, clientsParam]);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      globalFilter,
    },

    globalFilterFn: (row, _, filterValue) => {
      const client = String(row.getValue("client") ?? "").toLowerCase();
      const searchValue = filterValue.toLowerCase();

      return client.includes(searchValue);
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter clients..."
          value={globalFilter}
          onChange={(e) => {
            setGlobalFilter(e.target.value);
          }}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id.replace("_", " ")}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
