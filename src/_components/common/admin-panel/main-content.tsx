import {
  Calendar,
  ChevronRight,
  HardHat,
  MapPin,
  ShoppingCart,
  Ticket,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";
import {
  getEvents,
  getNews,
  getOngoingEvents,
  getOrders,
  getPendingOrders,
  getStandings,
  getTeams,
  getTicketPurchases,
} from "@/lib/queries";
import { NewsSchema } from "@/types/news";
import { EventSchema } from "@/types/events";
import { format, parseISO } from "date-fns";
import { TicketPurchaseSchema } from "@/types/tickets";
import { StandingsSchema } from "@/types/teams";
import { cn, isNotEmpty } from "@/lib/utils";
import { OrderSchema } from "@/types/orders";

const MainContent = async () => {
  const news = await getNews();
  const ongoingEvents = await getOngoingEvents("");
  const allEvents = await getEvents("");
  const teams = await getTeams();
  const standingsData = await getStandings();
  const standings = standingsData.data;
  const ticketPurchases = await getTicketPurchases();
  const pendingOrders = await getPendingOrders();
  const orders = await getOrders();
  const recentOrders: OrderSchema[] = orders?.data.slice(0, 6);
  console.log(recentOrders.length);

  const admin_cards = [
    {
      icon: Calendar,
      title: "Total Events",
      number: allEvents?.data?.length,
    },
    {
      icon: HardHat,
      title: "Teams",
      number: teams?.data?.length,
    },
    {
      icon: Ticket,
      title: "Ticket Sales",
      number: ticketPurchases?.data?.length || 0,
    },
    {
      icon: ShoppingCart,
      title: "Pending Orders",
      number: pendingOrders?.data?.length || 0,
    },
  ];

  return (
    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          {admin_cards.map((card, index) => (
            <Card
              x-chunk="dashboard-05-chunk-1"
              className="bg-[#fcfcfd] min-w-0 flex-shrink-0"
              key={index}
            >
              <CardHeader className="">
                <CardTitle className="text-5xl text-[#EF3133] p-3 w-fit bg-[#FBEEEE] rounded-[100vh]">
                  <card.icon />
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex gap-1 flex-col justify-start items-start">
                <p className="text-[#667085] text-sm">{card.title}</p>
                <p className="text-[#101828] font-bold text-lg">
                  {card.number}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-2xl font-bold text-[#101828]">Ongoing events</div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          {ongoingEvents?.data
            ?.slice(0, 3)
            ?.map((card: EventSchema, index: number) => (
              <Card
                x-chunk="dashboard-05-chunk-1"
                className="bg-white min-w-0 flex-shrink-0"
                key={index}
              >
                <CardHeader className="">
                  <CardTitle className="text-2xl">{card.title}</CardTitle>
                </CardHeader>
                <CardFooter className="flex gap-2 flex-col text-[#667085] items-start">
                  <p className=" text-sm flex gap-2 items-center">
                    <Calendar size={18} /> {card.start_date}
                  </p>
                  <p className=" text-sm flex gap-2 truncate max-w-full items-center">
                    <MapPin size={18} /> {card.location}
                  </p>
                </CardFooter>
              </Card>
            ))}
        </div>

        <Tabs defaultValue="orders" className="lg:hidden">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="orders">
            <Card
              x-chunk="dashboard-05-chunk-3"
              className="min-w-0 bg-[#F9FAFB] flex-shrink-0"
            >
              <CardHeader className="px-7">
                <CardTitle>Orders</CardTitle>
                <CardDescription>
                  Recent orders from your store.
                </CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <div className="w-full overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="">Status</TableHead>
                        <TableHead className="">Quantity</TableHead>
                        <TableHead className="">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders && isNotEmpty(recentOrders) ? (
                        recentOrders?.map((order, index: number) => (
                          <TableRow
                            key={index}
                            className={index % 2 === 0 ? "bg-accent" : ""}
                          >
                            <TableCell>
                              <div className="font-medium">{order.name}</div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <span
                                className={cn(
                                  "text-xs",
                                  order.status === "DELIVERED" &&
                                    "text-[#34C759]",
                                )}
                              >
                                {order.status === "DELIVERED"
                                  ? "Completed"
                                  : order.status === "PAID"
                                    ? "Pending"
                                    : "Shipped"}
                              </span>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              1
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {new Date(order.sale_date).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="h-24 text-center">
                            No recent orders
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tickets">
            <Card
              x-chunk="dashboard-05-chunk-3"
              className="min-w-0 w-full bg-[#F9FAFB] flex-shrink-0"
            >
              <CardHeader className="px-7">
                <CardTitle>Tickets</CardTitle>
                <CardDescription>Tickets purchases</CardDescription>
              </CardHeader>
              <CardContent className="w-full">
                <div className="w-full overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Type
                        </TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Qty.
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Date
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="text-[#101828] text-sm">
                      {ticketPurchases &&
                      ticketPurchases?.data &&
                      ticketPurchases?.data.length > 0 ? (
                        ticketPurchases.data
                          .slice(0, 6)
                          .map(
                            (ticket: TicketPurchaseSchema, index: number) => (
                              <TableRow
                                key={index}
                                className={index % 2 === 0 ? "bg-accent" : ""}
                              >
                                <TableCell>
                                  <div className="font-medium">
                                    {ticket.customer_name}
                                  </div>
                                </TableCell>
                                <TableCell className="">
                                  {ticket.ticket_type}
                                </TableCell>
                                <TableCell className="">
                                  {ticket.ticket}
                                </TableCell>
                                <TableCell className="">
                                  {format(
                                    parseISO(ticket.sale_date),
                                    "MM/dd/yy",
                                  )}
                                </TableCell>
                              </TableRow>
                            ),
                          )
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="h-24 text-center">
                            No recent ticket purchases.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="gap-5 hidden lg:grid grid-cols-2">
          <Card
            x-chunk="dashboard-05-chunk-3"
            className="min-w-0 bg-[#F9FAFB] flex-shrink-0"
          >
            <CardHeader className="px-7">
              <CardTitle>Orders</CardTitle>
              <CardDescription>Recent orders from your store.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Status
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Quantity
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders && isNotEmpty(recentOrders) ? (
                    recentOrders?.slice(0, 6).map((order, index: number) => (
                      <TableRow
                        key={index}
                        className={index % 2 === 0 ? "bg-accent" : ""}
                      >
                        <TableCell>
                          <div className="font-medium">{order.name}</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <span
                            className={cn(
                              "text-xs",
                              order.status === "DELIVERED" && "text-[#34C759]",
                            )}
                          >
                            {order.status === "DELIVERED"
                              ? "Completed"
                              : order.status === "PAID"
                                ? "Pending"
                                : "Shipped"}
                          </span>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          1
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {new Date(order.sale_date).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No recent orders
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-3"
            className="min-w-0 bg-[#F9FAFB] flex-shrink-0"
          >
            <CardHeader className="px-7">
              <CardTitle>Tickets</CardTitle>
              <CardDescription>Tickets purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Type
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Qty.
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Date
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-[#101828] text-sm">
                    {ticketPurchases &&
                    ticketPurchases?.data &&
                    ticketPurchases?.data.length > 0 ? (
                      ticketPurchases.data
                        .slice(0, 6)
                        .map((ticket: TicketPurchaseSchema, index: number) => (
                          <TableRow
                            key={index}
                            className={index % 2 === 0 ? "bg-accent" : ""}
                          >
                            <TableCell>
                              <div className="font-medium">
                                {ticket.customer_name}
                              </div>
                            </TableCell>
                            <TableCell className="">
                              {ticket.ticket_type}
                            </TableCell>
                            <TableCell className="">{ticket.ticket}</TableCell>
                            <TableCell className="">
                              {format(parseISO(ticket.sale_date), "MM/dd/yy")}
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          No recent ticket purchases.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div>
        <Tabs defaultValue="standings" className="lg:hidden">
          <TabsList>
            <TabsTrigger value="standings">Standings</TabsTrigger>
            <TabsTrigger value="news">News Updates</TabsTrigger>
          </TabsList>
          <TabsContent
            value="standings"
            className=" max-w-[380px] bg-[#fcfcfd]"
          >
            <Card className="min-w-0 flex-shrink-0">
              <CardHeader className="text-xl">Standings</CardHeader>
              <CardContent>
                {standings && standings.length > 0 ? (
                  standings.map((item: StandingsSchema, index: number) => (
                    <div className="flex gap-2 justify-between">
                      <div className="flex gap-4 items-center">
                        <span className="text-[#667085] text-[13px]">
                          {index + 1}
                        </span>
                        <span className="text-[#101828] text-[13px]">
                          {item.name}
                        </span>
                      </div>
                      <p className="text-xl font-bold">{item.total_point}</p>
                    </div>
                  ))
                ) : (
                  <p>No teams </p>
                )}
              </CardContent>
              <CardFooter className="self-center justify-center ">
                <Link
                  href={"/teams/standings"}
                  className="flex items-center gap-2 text-xl text-[#EF3133]"
                >
                  View All <ChevronRight size={18} />
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="news" className=" max-w-[380px] bg-[#fcfcfd]">
            <Card className="min-w-0 flex-shrink-0">
              <CardHeader className="text-xl">News Updates</CardHeader>
              <CardContent className="flex gap-3 flex-col">
                {news && Array.isArray(news?.data) && news?.data.length > 0 ? (
                  news?.data
                    .slice(0, 4)
                    .map((item: NewsSchema, index: number) => (
                      <div key={index} className="flex gap-2 justify-between">
                        <Image
                          src={item.image ?? "/placeholder.webp"}
                          width={100}
                          height={100}
                          alt={item.title}
                          className="object-cover"
                        />
                        <div className="flex gap-4 flex-col items-end">
                          <span className="text-[#101828] text-[13px]">
                            {item.title}
                          </span>
                          <span className="text-[#667085] text-[13px]">
                            {item.created}
                          </span>
                        </div>
                      </div>
                    ))
                ) : (
                  <p>No news</p>
                )}
              </CardContent>
              <CardFooter className="self-center justify-center ">
                <Link
                  href={"/news"}
                  className="flex items-center gap-2 text-xl text-[#EF3133]"
                >
                  Manage News <ChevronRight size={18} />
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="hidden lg:flex flex-col justify-between h-full gap-5">
          <Card className="min-w-0 flex-shrink-0">
            <CardHeader className="text-xl">Standings</CardHeader>
            <CardContent>
              {standings && standings.length > 0 ? (
                standings.map((item: StandingsSchema, index: number) => (
                  <div className="flex gap-2 justify-between">
                    <div className="flex gap-4 items-center">
                      <span className="text-[#667085] text-[13px]">
                        {index + 1}
                      </span>
                      <span className="text-[#101828] text-[13px]">
                        {item.name}
                      </span>
                    </div>
                    <p className="text-xl font-bold">{item.total_point}</p>
                  </div>
                ))
              ) : (
                <p>No teams </p>
              )}
            </CardContent>
            <CardFooter className="self-center justify-center ">
              <Link
                href={"/teams/standings"}
                className="flex items-center gap-2 text-xl text-[#EF3133]"
              >
                View All <ChevronRight size={18} />
              </Link>
            </CardFooter>
          </Card>
          <Card className="min-w-0 flex-shrink-0">
            <CardHeader className="text-xl">News Updates</CardHeader>
            <CardContent className="flex gap-3 flex-col">
              {news && Array.isArray(news?.data) && news?.data.length > 0 ? (
                news?.data
                  .slice(0, 4)
                  .map((item: NewsSchema, index: number) => (
                    <div key={index} className="flex gap-2 justify-between">
                      <Image
                        src={item.image ?? "/placeholder.webp"}
                        width={100}
                        height={100}
                        alt={item.title}
                        className="object-cover"
                      />
                      <div className="flex gap-4 flex-col justify-between">
                        <span className="text-[#101828] text-[13px]">
                          {item.title}
                        </span>
                        <span className="text-[#667085] text-[13px]">
                          {item.created}
                        </span>
                      </div>
                    </div>
                  ))
              ) : (
                <p>No news</p>
              )}
            </CardContent>
            <CardFooter className="self-center justify-center ">
              <Link
                href={"/news"}
                className="flex items-center gap-2 text-xl text-[#EF3133]"
              >
                Manage News <ChevronRight size={18} />
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
