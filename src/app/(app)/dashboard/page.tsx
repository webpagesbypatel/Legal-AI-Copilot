import {
  Activity,
  ArrowUpRight,
  BookText,
  Calendar,
  CreditCard,
  DollarSign,
  Download,
  FileText,
  Users,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"


export default function Dashboard() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Cases
            </CardTitle>
            <BookText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 since last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Deadlines
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              1 due this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">E-Filings</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 Pending</div>
            <p className="text-xs text-muted-foreground">
              2 submitted yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Smart Calendar</CardTitle>
            <CardDescription>
              Key dates and deadlines for your cases.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
             <CalendarComponent
                mode="single"
                className="rounded-md border"
             />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Hearings</CardTitle>
            <CardDescription>
              Automatic transcription and summarization.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="https://placehold.co/36x36" alt="Avatar" />
                <AvatarFallback>SK</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  State v. Sharma
                </p>
                <p className="text-sm text-muted-foreground">
                  Transcription complete.
                </p>
              </div>
              <div className="ml-auto font-medium">1h ago</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="https://placehold.co/36x36" alt="Avatar" />
                <AvatarFallback>PA</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Patel & Associates
                </p>
                <p className="text-sm text-muted-foreground">
                  Summary generated.
                </p>
              </div>
              <div className="ml-auto font-medium">3h ago</div>
            </div>
             <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="https://placehold.co/36x36" alt="Avatar" />
                <AvatarFallback>RG</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Gupta Real Estate
                </p>
                <p className="text-sm text-muted-foreground">
                  Transcription in progress...
                </p>
              </div>
              <div className="ml-auto font-medium">1d ago</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
