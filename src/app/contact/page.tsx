'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form Submitted:', values);
    
    setIsSubmitting(false);
    setIsSuccess(true);
    form.reset();
    toast({
      title: 'Message Sent!',
      description: "Thank you for reaching out. We'll be in touch shortly.",
    });
  }

  const FormSkeleton = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-36 w-full" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );

  return (
    <>
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Get in Touch</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/90">
            We're here to answer your questions and help you get started on your digital journey.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-2">
                  <Send className="h-6 w-6 text-primary" />
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isClient ? <FormSkeleton /> : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Message</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Tell us how we can help you..." className="min-h-[150px]" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold font-headline text-primary mb-4">Contact Information</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>contact@vworks.com</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>(123) 456-7890</span>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <span>123 Digital Avenue,<br />Webville, 12345</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold font-headline text-primary mb-4">Need a quicker response?</h3>
              <p className="text-muted-foreground mb-4">Chat with us directly on WhatsApp for instant support and inquiries.</p>
              <Button asChild className="w-full bg-green-500 hover:bg-green-600 text-white">
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" /> Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
