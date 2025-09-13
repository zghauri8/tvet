import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Briefcase, CheckCircle } from "lucide-react";

const Authentication = () => {
  const navigate = useNavigate();

  const roleOptions = [
    {
      id: "TVET_STUDENT",
      title: "TVET Student",
      icon: GraduationCap,
      description: "Access career assessments and TVET pathway recommendations",
      benefits: [
        "Free personality assessments",
        "TVET career recommendations",
        "Skills gap analysis",
        "Educational pathway guidance",
      ],
      color: "text-accent bg-accent/10 border-accent/20",
    },
    {
      id: "WORKING_ADOF",
      title: "Working Professional",
      icon: Briefcase,
      description: "Get comprehensive career insights and coaching services",
      benefits: [
        "Advanced career analytics",
        "Leadership assessments",
        "Coaching recommendations",
        "Industry insights",
      ],
      color: "text-primary bg-primary/10 border-primary/20",
    },
  ];

  const handleRoleSelection = (roleId: string) => {
    // Navigate to signup with the selected role
    navigate(`/signup?role=${roleId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Choose Your Path</h2>
        <p className="text-muted-foreground text-lg">
          Select your profile to get personalized career recommendations
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {roleOptions.map((role) => {
          const Icon = role.icon;
          return (
            <Card
              key={role.id}
              className={`p-6 cursor-pointer hover:shadow-hover transition-all duration-300 border-2 ${role.color}`}
              onClick={() => handleRoleSelection(role.id)}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {role.description}
                </p>
              </div>

              <div className="space-y-3">
                {role.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-6 bg-gradient-primary hover:shadow-soft">
                Continue as {role.title}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Authentication;
