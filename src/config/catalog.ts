/**
 * SERVICE CATALOG — how the 2026 redesign presents the services.
 *
 * The design groups the 17 services into four families and gives each a short
 * card name, a one-line summary, an illustration and an icon. URLs are NOT the
 * design's: every service keeps its live slug from src/config/site.ts, which is
 * also the URL the SEO keyword map (src/data/keyword-map.json) targets.
 *
 * Order within each group is the design's order, used by the mega menu, the
 * services grid and the request-form dropdown alike.
 */
import { site, paths, type ServiceDef } from './site';
import type { IconName } from '@lib/icons';
import type { ImageKey } from '@lib/media';

export type DesignGroupKey = 'repairs' | 'drains' | 'remodels' | 'heaters';

export interface CatalogService {
  /** Live slug in site.ts — /services/[slug]/ */
  slug: string;
  /** Card / menu name, sentence case as in the design */
  name: string;
  /** One-line card summary */
  summary: string;
  group: DesignGroupKey;
  image: ImageKey;
  icon: IconName;
  /** Short label for "… in [Town]" chips, matching the keyword map's wording */
  short: string;
  /** Words that identify this service in a review's `service` field */
  reviewMatch: string[];
}

export interface CatalogGroup {
  key: DesignGroupKey;
  number: string;
  /** Section title on the services grid */
  title: string;
  /** Column title in the mega menu */
  menuTitle: string;
  /** Eyebrow above a service page H1 */
  eyebrow: string;
  /** Group icon path (24×24 stroke), from the design */
  iconPath: string;
  services: CatalogService[];
}

const S = (
  slug: string,
  name: string,
  summary: string,
  group: DesignGroupKey,
  image: ImageKey,
  icon: IconName,
  short: string,
  reviewMatch: string[],
): CatalogService => ({ slug, name, summary, group, image, icon, short, reviewMatch });

const SERVICES: CatalogService[] = [
  S('general-plumbing', 'General plumbing', "Leaks, broken fixtures and valves that won't shut off.", 'repairs', 'services/general-plumbing-el-cajon', 'service-general-plumbing', 'General plumbing', ['general', 'residential']),
  S('faucet-services', 'Faucet repair and installation', 'Dripping or broken faucets fixed or replaced.', 'repairs', 'services/faucet-repair-installation', 'service-faucet-repair-and-installation', 'Faucet repair', ['faucet']),
  S('sink-services', 'Sink services', 'Leaking, slow or broken kitchen and bathroom sinks.', 'repairs', 'services/sink-repair-services', 'service-sink-services', 'Sink repair', ['sink', 'bathroom']),
  S('garbage-disposal', 'Garbage disposal', 'Jammed, leaking or worn-out disposals repaired or replaced.', 'repairs', 'services/garbage-disposal-repair', 'service-garbage-disposal', 'Garbage disposal repair', ['disposal']),
  S('water-pressure-regulators', 'Water pressure regulators', "Water pressure that's too high or too low, set right.", 'repairs', 'services/water-pressure-regulator', 'service-water-pressure-regulators', 'Water pressure regulator replacement', ['pressure']),
  S('property-management-plumbing', 'Property Management Plumbing', 'For landlords, rental managers and HOAs, we handle tenant repairs in rentals and managed properties, at the same price day or night, Monday to Saturday.', 'repairs', 'services/property-management-plumbing', 'service-property-management-plumbing', 'Property management plumbing', ['commercial', 'residential']),
  S('drain-cleaning', 'Drain cleaning', 'Slow and blocked drains cleared, including main lines.', 'drains', 'services/drain-cleaning-el-cajon', 'service-drain-cleaning', 'Drain cleaning', ['drain']),
  S('sewer-lines', 'Sewer line repair', 'Cracked, broken or blocked sewer lines repaired.', 'drains', 'services/sewer-line-repair', 'service-sewer-line-repair', 'Sewer line repair', ['sewer', 'water line']),
  S('grease-trap', 'Grease trap services', 'Grease trap care for restaurants and commercial kitchens.', 'drains', 'services/grease-trap-services', 'service-grease-trap-services', 'Grease trap services', ['grease']),
  S('toilet-repair-installation', 'Toilet repair and installation', 'Running, leaking or clogged toilets, and new installs.', 'remodels', 'services/toilet-repair-installation', 'service-toilet-repair-and-installation', 'Toilet repair', ['toilet']),
  S('shower-installation', 'Shower installation', 'New showers and shower remodels, plumbed in properly.', 'remodels', 'services/shower-installation', 'service-shower-installation', 'Shower installation', ['bathroom', 'shower']),
  S('kitchen-bath-remodels', 'Kitchen and bath remodel plumbing', 'Plumbing moved or added for kitchen and bathroom remodels.', 'remodels', 'services/kitchen-bath-remodel-plumbing', 'service-kitchen-and-bath-remodel-plumbing', 'Remodel plumbing', ['remodel', 'kitchen', 'bathroom']),
  S('water-heater', 'Water heater repair and installation', 'No hot water, a leaking tank, or a new heater put in.', 'heaters', 'services/water-heater-repair-installation', 'service-water-heater-repair-and-installation', 'Water heater repair', ['water heater', 'heater']),
  S('slab-leak-repair', 'Slab leak detection and repair', 'Leaks under the slab found and fixed.', 'heaters', 'services/slab-leak-detection-repair', 'service-slab-leak-detection-and-repair', 'Slab leak repair', ['slab', 'leak', 'water line']),
  S('water-lines', 'Water line repair and repiping', 'Leaking or old water lines repaired or replaced.', 'heaters', 'services/water-line-repair-repiping', 'service-water-line-repair-and-repiping', 'Repiping', ['water line', 'repip']),
  S('gas-lines', 'Gas line installation and repair', 'Gas lines for appliances installed or repaired.', 'heaters', 'services/gas-line-installation-repair', 'service-gas-line-installation-and-repair', 'Gas line repair', ['gas']),
  S('water-filtration', 'Water filtration systems', 'Filtration systems installed for cleaner water at home.', 'heaters', 'services/water-filtration-systems', 'service-water-filtration-systems', 'Water filtration systems', ['filtration', 'water system']),
];

const GROUP_META: Omit<CatalogGroup, 'services'>[] = [
  {
    key: 'repairs',
    number: '01',
    title: 'Sedco Everyday Repair Services',
    menuTitle: 'Everyday Repairs',
    eyebrow: 'Everyday Repair Services',
    iconPath:
      'M2 9h20v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z M8 9V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3 M2 14h20 M10 14v2h4v-2',
  },
  {
    key: 'drains',
    number: '02',
    title: 'Sedco Drain and Sewer Line Services',
    menuTitle: 'Drain & Sewer',
    eyebrow: 'Drain & Sewer Services',
    iconPath:
      'M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97',
  },
  {
    key: 'remodels',
    number: '03',
    title: 'Sedco Toilet, Shower and Remodel Services',
    menuTitle: 'Toilets, Showers & Remodels',
    eyebrow: 'Toilet, Shower & Remodel Services',
    iconPath:
      'M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.68 3 4 3.68 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5 M2 12h20 M7 19v2 M17 19v2',
  },
  {
    key: 'heaters',
    number: '04',
    title: 'Sedco Water Heater, Water and Gas Line Services',
    menuTitle: 'Water Heater, Water & Gas',
    eyebrow: 'Water Heater, Water & Gas Services',
    iconPath: 'M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z',
  },
];

// Every service in site.ts must appear in the catalog exactly once, and the
// other way round, so no service page can fall out of the menus.
{
  const configured = new Set(site.services.map((s) => s.slug));
  const listed = SERVICES.map((s) => s.slug);
  const missing = [...configured].filter((slug) => !listed.includes(slug));
  const unknown = listed.filter((slug) => !configured.has(slug));
  if (missing.length || unknown.length || new Set(listed).size !== listed.length) {
    throw new Error(
      `catalog.ts is out of sync with site.ts — missing: [${missing}], unknown: [${unknown}]`,
    );
  }
}

export const catalogServices: CatalogService[] = SERVICES;

/**
 * Extra words people use for each service, so the header search can find it
 * ("clog" → Drain cleaning). Only the service name and icon are displayed.
 */
export const SEARCH_TERMS: Record<string, string> = {
  'general-plumbing': 'plumber repair leak leaking pipe valve fixture inspection emergency',
  'faucet-services': 'faucet tap drip dripping leaky kitchen bathroom fixture',
  'sink-services': 'sink basin kitchen bathroom leaking slow drain p-trap',
  'garbage-disposal': 'disposal garburator jammed humming kitchen sink',
  'water-pressure-regulators': 'pressure regulator prv valve low high water pressure',
  'property-management-plumbing': 'landlord rental tenant property manager hoa apartment commercial',
  'drain-cleaning': 'drain clog clogged blocked slow backup hydro jetting snake rooter main line',
  'sewer-lines': 'sewer line main lateral backup roots broken pipe septic camera',
  'grease-trap': 'grease trap interceptor restaurant commercial kitchen',
  'toilet-repair-installation': 'toilet running clogged leaking wc install replace flush',
  'shower-installation': 'shower tub bathtub valve remodel walk-in conversion',
  'kitchen-bath-remodels': 'remodel renovation kitchen bathroom rough-in plumbing',
  'water-heater': 'water heater hot water tank tankless boiler no hot water leaking',
  'slab-leak-repair': 'slab leak foundation hidden leak detection under floor high water bill',
  'water-lines': 'water line repipe repiping galvanized copper pex main supply pipe',
  'gas-lines': 'gas line leak stove range bbq dryer fire pit shutoff',
  'water-filtration': 'water filter filtration softener hard water purification whole house',
};

export const catalogGroups: CatalogGroup[] = GROUP_META.map((g) => ({
  ...g,
  services: SERVICES.filter((s) => s.group === g.key),
}));

export const catalogGroup = (key: DesignGroupKey): CatalogGroup => {
  const match = catalogGroups.find((g) => g.key === key);
  if (!match) throw new Error(`Unknown catalog group: "${key}"`);
  return match;
};

export const catalogService = (slug: string): CatalogService => {
  const match = SERVICES.find((s) => s.slug === slug);
  if (!match) throw new Error(`Unknown service slug in catalog: "${slug}"`);
  return match;
};

export const serviceHref = (s: CatalogService | ServiceDef): string => paths.service(s.slug);

/**
 * Footer "Services" column — the design's seven, in its order.
 */
export const footerServices: CatalogService[] = [
  'general-plumbing',
  'drain-cleaning',
  'toilet-repair-installation',
  'shower-installation',
  'kitchen-bath-remodels',
  'water-heater',
  'property-management-plumbing',
].map(catalogService);

/** Options for the "What do you need?" dropdown on every request form. */
export const requestServiceOptions: string[] = [
  'Not sure',
  ...SERVICES.map((s) => s.name),
  'Something else',
];

/** Options for the "Service address city" dropdown. */
export const requestCityOptions: string[] = [
  ...site.cities.map((c) => c.name),
  'Other San Diego County city',
];
