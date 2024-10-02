
// Database Connections
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { pgTable, serial, varchar, integer, timestamp } from 'drizzle-orm/pg-core';

// Initialize the Neon client with your connection string
const sql = neon('postgresql://berlnw_owner:2wvNWIygZeR0@ep-small-wave-a1tv2csc.ap-southeast-1.aws.neon.tech/berlnw?sslmode=require');
// Initialize Drizzle ORM with the Neon client
const db = drizzle(sql);
// Export the db instance for use in your application
export default db;

// Define the Leads table
export const leadsTable = pgTable('leads', {
  id: serial('id').primaryKey(),
  phone_number: varchar('phone_number', { length: 255 }).notNull().unique(), // Add .unique() for uniqueness
  search_count: integer('search_count').default(1).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});


// Define the Sellers table
export const sellersTable = pgTable('sellers', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  contact_number: varchar('contact_number', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  line_user_id: varchar('line_user_id', { length: 255 }).notNull(),
});

// Define the Phone Numbers table
export const phoneNumbersTable = pgTable('phone_numbers', {
  id: serial('id').primaryKey(),
  seller_id: integer('seller_id').references(() => sellersTable.id).notNull(),
  phone_number: varchar('phone_number', { length: 255 }).notNull(),
  price: integer('price').notNull(),
  view_count: integer('view_count').default(0).notNull(),
});


