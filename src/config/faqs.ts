/**
 * Site-wide plumbing FAQs ("Common Questions About Our Plumbing Service"),
 * from the design. Shown on Home (which carries their FAQPage schema) and on
 * the hub pages. Every answer reflects terms the client has confirmed.
 */
import type { Faq } from '@lib/types';

export const commonFaqs: Faq[] = [
  {
    question: 'Do you charge for estimates?',
    answer: [
      "No, our estimates are free, and there's no call-out fee or trip charge either. Our plumber looks at the problem and tells you the price, and then it's up to you whether we go ahead.",
    ],
  },
  {
    question: 'How quickly can a plumber get to me?',
    answer: [
      "Same-day visits are available from Monday to Saturday, and we're open 24 hours on each of those days. If you send us a request through the website, we'll call you back within 30 minutes to talk about the problem and agree on a time.",
    ],
  },
  {
    question: 'Do you charge more at night or on Saturdays?',
    answer: [
      "No, a call at night or on a Saturday costs the same as one on a weekday afternoon. We're closed on Sundays, so if you send us a request on a Sunday, we'll get back to you on Monday.",
    ],
  },
  {
    question: 'Do you work outside El Cajon?',
    answer: [
      "Yes, we're based in El Cajon, but we take jobs right across San Diego County, and most of our work is in East County towns like [La Mesa](/service-areas/la-mesa/), [Santee](/service-areas/santee/), [Lakeside](/service-areas/lakeside/) and [Alpine](/service-areas/alpine/). Wherever you are, you get the same free estimate and the same prices.",
    ],
  },
  {
    question: 'Are you a licensed plumber?',
    answer: [
      'Yes, Sedco Plumbing is a licensed CA C-36 plumbing contractor, which is the California license for plumbing work, so your job is handled by a licensed plumbing company rather than a general handyman.',
    ],
  },
  {
    question: 'What does your 30-day guarantee cover?',
    answer: [
      "It covers all of our work for 30 days, with no exceptions. If the same problem comes back in that time, for example the same drain blocks up again, we'll come back and fix it at no charge.",
    ],
  },
  {
    question: 'Do you work for landlords and businesses?',
    answer: [
      'Yes, we work for homeowners, landlords, rental managers and businesses alike. If you look after rentals or other properties, our [property management plumbing service](/services/property-management-plumbing/) makes it easy to send us tenant repairs whenever they come up.',
    ],
  },
];
