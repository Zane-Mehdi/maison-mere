/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: classes
 * @catalog This collection is an eCommerce catalog
 * Interface for Classes
 */
export interface Classes {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  itemName?: string;
  /** @wixFieldType number */
  itemPrice?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  itemImage?: string;
  /** @wixFieldType text */
  itemDescription?: string;
  /** @wixFieldType text */
  difficultyLevel?: string;
  /** @wixFieldType number */
  duration?: number;
  /** @wixFieldType text */
  instructorName?: string;
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
