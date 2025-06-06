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
import { Referral } from "@/helpers/types/ReferralType";
import supabase from "@/helpers/SupabaseAuth";

export const columns: ColumnDef<Referral>[] = [
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
    accessorKey: "referrer",
    header: "Referrer",
    cell: ({ row }) => {
      const referrer = row.original.referrer.contact;

      return (
        <div className="lowercase whitespace-nowrap overflow-hidden text-ellipsis max-w-[22ch]">
          {referrer}
        </div>
      );
    },
  },
  {
    accessorKey: "referred",
    header: "Referred",
    cell: ({ row }) => {
      const referred = row.original.referred.contact;

      return (
        <div className="lowercase whitespace-nowrap overflow-hidden text-ellipsis max-w-[22ch]">
          {referred}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Referral date",
    cell: ({ row }) => {
      const referralDate = row.original.date;
      const formattedDate = referralDate.toLocaleDateString("en-US", {
        timeZone: "UTC",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return <div>{formattedDate}</div>;
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="capitalize">{row.original.status}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const referral = row.original;
      const navigate = useNavigate();

      // TODO: Move this out into a helper function
      const updateReferralStatus = async (
        newStatus: "successful" | "cancelled" | "pending approval"
      ) => {
        try {
          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (!session) {
            console.log("No session");
            return;
          }

          const response = await fetch(
            `${
              import.meta.env.VITE_BACKEND_API_URL
            }/api/referrals/update-status/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.access_token}`,
              },
              body: JSON.stringify({
                referral_id: referral.referralId,
                status: newStatus,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to update referral status");
          }

          await response.json();
          toast({
            title: "Success",
            description: `Referral has been ${
              newStatus === "successful"
                ? "approved"
                : newStatus === "cancelled"
                ? "cancelled"
                : "reactivated"
            }`,
          });
          window.location.reload();
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to update referral status",
            variant: "destructive",
          });
        }
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
            {referral.status === "pending appointment" ||
            referral.status === "pending approval" ? (
              <div>
                <DropdownMenuItem
                  onClick={() => updateReferralStatus("successful")}
                  disabled={referral.status === "pending appointment"}
                >
                  Approve referral
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => updateReferralStatus("cancelled")}
                >
                  Cancel referral
                </DropdownMenuItem>
              </div>
            ) : (
              <div>
                <DropdownMenuItem
                  onClick={() => updateReferralStatus("pending approval")}
                  disabled={referral.status === "successful"}
                >
                  Reactivate referral
                </DropdownMenuItem>
              </div>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                const url = `/dashboard/clients?id=${referral.referrer.clientId},${referral.referred.clientId}`;
                navigate(url);
              }}
            >
              View clients' details
            </DropdownMenuItem>
            {referral.status === "pending appointment" ||
            referral.status === "pending approval" ? (
              <div>
                <DropdownMenuItem
                  disabled={referral.status === "pending approval"}
                >
                  View appointment
                </DropdownMenuItem>
              </div>
            ) : (
              <div>
                <DropdownMenuItem
                  disabled={referral.status === "cancelled"}
                  onClick={() => {
                    const rewardIds = referral.rewards
                      .map((reward) => reward.rewardId)
                      .join(",");
                    const url = `/dashboard/rewards?id=${rewardIds}`;
                    navigate(url);
                  }}
                >
                  View issued rewards
                </DropdownMenuItem>
              </div>
            )}
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(referral.referralId);
                toast({
                  description: "Referral ID copied to clipboard.",
                });
              }}
            >
              Copy referral ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface ReferralsTableProps {
  data: Referral[];
}

export function ReferralsTable({ data }: ReferralsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "date", desc: true },
  ]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [searchParams] = useSearchParams();
  const referralsParam = searchParams.get("id")?.split(",");

  const filteredData = React.useMemo(() => {
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

    if (referralsParam && referralsParam.length > 0) {
      return sortedData.filter((referral) =>
        referralsParam.includes(referral.referralId)
      );
    }
    return sortedData;
  }, [data, referralsParam]);

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
      const referrerValue = row.original.referrer.contact;
      const referredValue = row.original.referred.contact;

      const referrer = String(referrerValue ?? "").toLowerCase();
      const referred = String(referredValue ?? "").toLowerCase();
      const searchValue = filterValue.toLowerCase();

      return referrer.includes(searchValue) || referred.includes(searchValue);
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter clients..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
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
