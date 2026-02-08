import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Phone, Mail, Stethoscope, UserCheck } from "lucide-react"
import { Button } from "../../components/ui/Button"

export function CareTeam() {
    const team = [
        {
            name: "Dr. Sarah Smith",
            role: "Primary Physician",
            phone: "555-0123",
            email: "dr.smith@clinic.com",
            icon: Stethoscope
        },
        {
            name: "James Wilson",
            role: "Caregiver (Day)",
            phone: "555-0124",
            email: "james.w@care.com",
            icon: UserCheck
        },
        {
            name: "Emily Davis",
            role: "Caregiver (Night)",
            phone: "555-0125",
            email: "emily.d@care.com",
            icon: UserCheck
        }
    ]

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-neutral-900">Care Team</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {team.map((member, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                                <member.icon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">{member.name}</CardTitle>
                                <p className="text-sm text-neutral-500">{member.role}</p>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4">
                            <div className="flex items-center text-sm text-neutral-600">
                                <Phone className="mr-2 h-4 w-4" />
                                {member.phone}
                            </div>
                            <div className="flex items-center text-sm text-neutral-600">
                                <Mail className="mr-2 h-4 w-4" />
                                {member.email}
                            </div>
                            <Button variant="outline" className="w-full mt-2">Contact</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
