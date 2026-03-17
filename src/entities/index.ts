/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: aboutclasstypes
 * Interface for AboutClassTypes
 */
export interface AboutClassTypes {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  classTypeName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  tagline?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  classTypeImage?: string;
  /** @wixFieldType text */
  keyBenefits?: string;
  /** @wixFieldType text */
  difficultyLevel?: string;
}


/**
 * Collection ID: classtypes
 * Interface for PilatesClassTypes
 */
export interface PilatesClassTypes {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  tagline?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image?: string;
  /** @wixFieldType text */
  benefits?: string;
  /** @wixFieldType text */
  difficultyLevel?: string;
}


/**
 * Collection ID: faqs
 * Interface for FrequentlyAskedQuestions
 */
export interface FrequentlyAskedQuestions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  question?: string;
  /** @wixFieldType text */
  answer?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType boolean */
  isFeatured?: boolean;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType datetime */
  lastUpdated?: Date | string;
}


/**
 * Collection ID: heroslides
 * Interface for HeroSlides
 */
export interface HeroSlides {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  slideImage?: string;
  /** @wixFieldType text */
  heading?: string;
  /** @wixFieldType text */
  subheading?: string;
  /** @wixFieldType text */
  ctaText?: string;
  /** @wixFieldType url */
  ctaLink?: string;
  /** @wixFieldType text */
  link?: string;
}


/**
 * Collection ID: homepagestats
 * Interface for HomepageStats
 */
export interface HomepageStats {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  statLabel?: string;
  /** @wixFieldType number */
  statValue?: number;
  /** @wixFieldType text */
  unitSuffix?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType boolean */
  isActive?: boolean;
}


/**
 * Collection ID: instructors
 * Interface for Instructors
 */
export interface Instructors {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  bio?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  photo?: string;
  /** @wixFieldType text */
  specialties?: string;
  /** @wixFieldType number */
  experienceYears?: number;
  /** @wixFieldType url */
  socialMediaLink?: string;
}


/**
 * Collection ID: pricingplans
 * @catalog This collection is an eCommerce catalog
 * Interface for PricingPlans
 */
export interface PricingPlans {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  planGroup?: string;
  /** @wixFieldType url */
  buyNowUrl?: string;
  /** @wixFieldType text */
  itemName?: string;
  /** @wixFieldType number */
  itemPrice?: number;
  /** @wixFieldType text */
  itemDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  itemImage?: string;
  /** @wixFieldType number */
  numberOfClasses?: number;
  /** @wixFieldType text */
  specialNotes?: string;
}


/**
 * Collection ID: testimonials
 * Interface for Testimonials
 */
export interface Testimonials {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  quote?: string;
  /** @wixFieldType text */
  authorName?: string;
  /** @wixFieldType text */
  authorTitle?: string;
  /** @wixFieldType number */
  rating?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  authorPhoto?: string;
}
