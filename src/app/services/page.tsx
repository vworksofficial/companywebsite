'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from '@/components/ui/card';
import { PRICING_DATA } from '@/lib/constants';
import { Check, X } from 'lucide-react';
import React from "react";

export default function ServicesPage() {
  const [openAccordion, setOpenAccordion] = React.useState<string | undefined>(PRICING_DATA[0].category);

  return (
    <>
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Layanan & Harga</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/90">
            Solusi digital yang transparan dan terukur untuk membantu bisnis Anda bertumbuh. Temukan paket yang paling sesuai dengan kebutuhan Anda.
          </p>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <Accordion 
            type="single" 
            collapsible 
            className="w-full space-y-4" 
            value={openAccordion}
            onValueChange={setOpenAccordion}
          >
            {PRICING_DATA.map((category) => (
              <Card key={category.category} className="overflow-hidden">
                <AccordionItem value={category.category} className="border-b-0">
                  <AccordionTrigger className="p-6 hover:no-underline hover:bg-muted/50 data-[state=open]:bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <category.icon className="h-6 w-6" />
                      </div>
                      <h2 className="font-headline text-xl md:text-2xl text-foreground">{category.category}</h2>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="min-w-[200px]">Paket</TableHead>
                              <TableHead>Harga</TableHead>
                              <TableHead>Deskripsi</TableHead>
                              <TableHead>Termasuk</TableHead>
                              <TableHead>Tidak Termasuk</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {category.packages.map((pkg) => (
                              <TableRow key={pkg.name}>
                                <TableCell className="font-medium align-top">
                                    <p className="font-bold">{pkg.name}</p>
                                    <p className="text-sm text-muted-foreground">{pkg.title}</p>
                                </TableCell>
                                <TableCell className="font-semibold text-primary align-top">{pkg.price}</TableCell>
                                <TableCell className="align-top text-sm">{pkg.description}</TableCell>
                                <TableCell className="align-top">
                                  <ul className="space-y-2">
                                      {pkg.includes.split(',').map(item => item.trim()).filter(Boolean).map(item => (
                                          <li key={item} className="flex items-start gap-2 text-sm">
                                              <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                              <span>{item}</span>
                                          </li>
                                      ))}
                                  </ul>
                                </TableCell>
                                <TableCell className="align-top">
                                    <ul className="space-y-2">
                                        {pkg.excludes.split(',').map(item => item.trim()).filter(Boolean).map(item => (
                                            <li key={item} className="flex items-start gap-2 text-sm">
                                                <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Card>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
