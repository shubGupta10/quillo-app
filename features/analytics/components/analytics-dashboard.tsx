"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, UserX, Activity, FolderPlus, CheckCircle2, FileText, UserPlus } from "lucide-react";
import { ClientDate } from "@/components/ui/client-date";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalyticsData } from "../queries";

interface AnalyticsDashboardProps {
  data: AnalyticsData;
}

export function AnalyticsDashboard({ data }: AnalyticsDashboardProps) {
  const { metrics, users, activityFeed } = data;

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.totalUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Registered platform accounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Users
            </CardTitle>
            <UserCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.activeUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active within last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Inactive Users
            </CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.inactiveUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              No activity in &gt; 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs System for Users & Live Activity Feed */}
      <Tabs defaultValue="users" className="w-full space-y-6">
        <TabsList>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            <span>Users ({users.length})</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-2">
            <Activity className="h-4 w-4" />
            <span>Live Activity Feed ({activityFeed.length})</span>
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4 outline-none">
          {users.length === 0 ? (
            <div className="text-center py-20 border rounded-lg bg-card space-y-3">
              <Users className="w-10 h-10 mx-auto text-muted-foreground opacity-30" />
              <p className="text-sm font-medium">No users found</p>
              <p className="text-sm text-muted-foreground">
                Registered users will appear here.
              </p>
            </div>
          ) : (
            <div className="border rounded-lg bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-xs text-muted-foreground uppercase border-b border-border">
                    <tr>
                      <th className="px-6 py-3 font-medium">User</th>
                      <th className="px-6 py-3 font-medium">Joined</th>
                      <th className="px-6 py-3 font-medium">Last Seen</th>
                      <th className="px-6 py-3 font-medium text-right">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {users.map((u) => {
                      const initials = u.fullName
                        ? u.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)
                        : "U";

                      return (
                        <tr
                          key={u.id}
                          className="hover:bg-accent/50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={u.image} alt={u.fullName} />
                                <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">
                                  {initials}
                                </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0">
                                <p className="font-medium text-sm truncate">
                                  {u.fullName}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {u.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs text-muted-foreground whitespace-nowrap">
                            <ClientDate
                              date={u.joinedAt}
                              options={{
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }}
                            />
                          </td>
                          <td className="px-6 py-4 text-xs text-muted-foreground whitespace-nowrap">
                            {u.lastSeenAt ? (
                              <ClientDate date={u.lastSeenAt} />
                            ) : (
                              "Never"
                            )}
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap">
                            {u.status === "ACTIVE" ? (
                              <Badge
                                variant="default"
                                className="bg-emerald-600 hover:bg-emerald-700 text-[10px]"
                              >
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="text-[10px]">
                                Inactive
                              </Badge>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Live Activity Feed Tab */}
        <TabsContent value="activity" className="space-y-4 outline-none">
          {activityFeed.length === 0 ? (
            <div className="text-center py-20 border rounded-lg bg-card space-y-3">
              <Activity className="w-10 h-10 mx-auto text-muted-foreground opacity-30" />
              <p className="text-sm font-medium">No recent activity</p>
              <p className="text-sm text-muted-foreground">
                Activity events will appear here as users engage.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border border rounded-lg bg-card overflow-hidden">
              {activityFeed.map((item, idx) => {
                let Icon = Activity;
                if (item.type === "USER_JOINED") Icon = UserPlus;
                if (item.type === "PROJECT_CREATED") Icon = FolderPlus;
                if (item.type === "DAILY_UPDATE_LOGGED") Icon = CheckCircle2;
                if (item.type === "CONTENT_GENERATED") Icon = FileText;

                return (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="mt-0.5 rounded-md p-2 bg-muted text-primary shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium leading-none">
                          {item.title}
                        </p>
                        <div className="text-xs text-muted-foreground whitespace-nowrap">
                          <ClientDate date={item.timestamp} />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
