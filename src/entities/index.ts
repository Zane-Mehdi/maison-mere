/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

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
 * Collection ID: pricinggroups
 * Interface for PricingGroups
 */
export interface PricingGroups {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  groupName?: string;
  /** @wixFieldType text */
  groupDescription?: string;
  /** @wixFieldType boolean */
  isActive?: boolean;
  /** @wixFieldType number */
  sortOrder?: number;
  /** @wixFieldType text */
  slug?: string;
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
