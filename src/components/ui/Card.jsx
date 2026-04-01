function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Card({ className, ...props }) {
  return (
    <div
      className={cn('rounded-lg border border-white/10 bg-white/5 text-white shadow-sm', className)}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }) {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
}

export function CardContent({ className, ...props }) {
  return (
    <div className={cn('p-6 pt-0', className)} {...props} />
  )
}
