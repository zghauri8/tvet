import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Star, 
  Zap, 
  Crown, 
  CreditCard, 
  Shield,
  Users,
  Brain,
  TrendingUp
} from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  icon: any;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
  buttonVariant: 'default' | 'outline';
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Student Free',
    icon: Users,
    price: 'Free',
    period: 'Always',
    description: 'Perfect for TVET students starting their career journey',
    features: [
      'Basic personality assessment',
      'TVET career recommendations',
      '3 career matches',
      'Skills gap analysis',
      'Educational pathway guidance',
      'Community support'
    ],
    buttonText: 'Get Started Free',
    buttonVariant: 'outline'
  },
  {
    id: 'professional',
    name: 'Professional',
    icon: Brain,
    price: 'RM 99',
    period: 'per month',
    description: 'Comprehensive career insights for working professionals',
    features: [
      'Advanced personality assessment',
      'Unlimited career recommendations',
      'Detailed strengths & weaknesses report',
      'Industry salary insights',
      '2 coaching sessions per month',
      'Priority support',
      'Career development roadmap',
      'LinkedIn profile optimization'
    ],
    popular: true,
    buttonText: 'Start Professional',
    buttonVariant: 'default'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    icon: Crown,
    price: 'RM 299',
    period: 'per month',
    description: 'Complete hiring and talent management solution',
    features: [
      'Unlimited candidate assessments',
      'AI-powered candidate matching',
      'Team personality analytics',
      'Custom assessment templates',
      'Bulk candidate screening',
      'Advanced reporting dashboard',
      'Dedicated account manager',
      'API integration',
      'White-label solution'
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'default'
  }
];

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    // Mock payment process
    if (planId === 'enterprise') {
      alert('Enterprise sales team will contact you within 24 hours!');
    } else {
      alert(`Redirecting to payment for ${planId} plan...`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-gradient-primary text-white">
          Pricing Plans
        </Badge>
        <h2 className="text-4xl font-bold mb-4">
          Choose Your Career Success Path
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          From free student assessments to enterprise hiring solutions, 
          we have the right plan for your career development needs.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {pricingPlans.map((plan) => {
          const Icon = plan.icon;
          const isSelected = selectedPlan === plan.id;
          
          return (
            <Card 
              key={plan.id}
              className={`relative p-8 shadow-card hover:shadow-hover transition-all duration-300 ${
                plan.popular ? 'border-2 border-primary scale-105' : ''
              } ${isSelected ? 'ring-2 ring-primary' : ''}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-white">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}

              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period !== 'Always' && (
                    <span className="text-muted-foreground ml-2">/{plan.period}</span>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full ${plan.buttonVariant === 'default' ? 'bg-gradient-primary hover:shadow-soft' : ''}`}
                variant={plan.buttonVariant}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {plan.buttonText}
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Payment Security */}
      <div className="text-center mb-12">
        <Card className="max-w-2xl mx-auto p-6 bg-gradient-card">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-success mr-3" />
            <h3 className="text-xl font-semibold">Secure Payment Processing</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            All payments are processed securely with bank-level encryption. 
            We support major credit cards and online banking.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CreditCard className="w-4 h-4 mr-1" />
              <span>Visa/Mastercard</span>
            </div>
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-1" />
              <span>Instant Activation</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-1" />
              <span>SSL Secured</span>
            </div>
          </div>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h4 className="font-semibold mb-2">Can I change plans later?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. 
              Changes take effect immediately with prorated billing.
            </p>
          </Card>
          
          <Card className="p-6">
            <h4 className="font-semibold mb-2">What's included in coaching?</h4>
            <p className="text-sm text-muted-foreground">
              One-on-one sessions with certified career coaches, personalized 
              development plans, and ongoing support via chat.
            </p>
          </Card>
          
          <Card className="p-6">
            <h4 className="font-semibold mb-2">Is there a money-back guarantee?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, we offer a 30-day money-back guarantee for all paid plans. 
              No questions asked.
            </p>
          </Card>
          
          <Card className="p-6">
            <h4 className="font-semibold mb-2">How accurate are AI recommendations?</h4>
            <p className="text-sm text-muted-foreground">
              Our AI has 94% accuracy based on thousands of successful career 
              matches and continuous learning from outcomes.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Pricing;