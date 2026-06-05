import * as React from "react"

export function VlogCard() {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="h-48 bg-muted rounded-lg animate-pulse mb-4" />
      <div className="h-6 bg-muted rounded w-3/4 animate-pulse mb-2" />
      <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
    </div>
  )
}