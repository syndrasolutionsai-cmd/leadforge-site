import { Search, Sparkles, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader } from '../ui/Card'

const steps = [
  {
    icon: Search,
    title: 'Prospect Discovery',
    desc: 'Define your ICP once. LeadForge finds verified prospects from multiple sources, removes duplicates, and scores each lead against your ideal customer profile.',
  },
  {
    icon: Sparkles,
    title: 'AI Personalization',
    desc: 'A 5-stage AI pipeline detects the strongest outreach signal per lead and writes a fully personalized email — funding, hiring, product launches, and more.',
  },
  {
    icon: Zap,
    title: 'Send & Convert',
    desc: 'A/B test subject lines, send at scale, auto-classify replies, and book meetings automatically. Full attribution from first email to closed deal.',
  },
]

const CardDecorator = ({ children }) => (
  <div
    aria-hidden
    className="relative mx-auto size-36 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
  >
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:24px_24px]" />
    <div className="absolute inset-0 m-auto flex size-12 items-center justify-center border border-white/20 bg-white/5">
      {children}
    </div>
  </div>
)

export default function Features() {
  return (
    <div className="mx-auto mt-12 grid max-w-sm gap-6 sm:max-w-none sm:grid-cols-3">
      {steps.map((step, i) => {
        const Icon = step.icon
        return (
          <Card key={i} className="group border-white/10 bg-white/5 text-center">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Icon className="size-6 text-white" aria-hidden />
              </CardDecorator>
              <h3 className="mt-6 font-semibold text-white">{step.title}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/60">{step.desc}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
