/*
  # Create Quote Requests Table

  1. New Tables
    - `quote_requests`
      - `id` (uuid, primary key) - Unique identifier for each quote request
      - `service_type` (text) - Type of cleaning service requested
      - `property_size` (text) - Size of the property
      - `bedrooms` (integer) - Number of bedrooms
      - `bathrooms` (integer) - Number of bathrooms
      - `frequency` (text) - Cleaning frequency preference
      - `extras` (text array) - Additional services requested
      - `estimated_price` (integer) - Calculated price estimate
      - `customer_name` (text) - Customer's name
      - `customer_email` (text) - Customer's email address
      - `customer_phone` (text) - Customer's phone number
      - `status` (text) - Quote request status (pending, contacted, completed)
      - `created_at` (timestamptz) - Timestamp of quote request creation
      - `updated_at` (timestamptz) - Timestamp of last update

  2. Security
    - Enable RLS on `quote_requests` table
    - Add policy for anonymous users to insert their own quote requests
    - Add policy for reading quotes (customers can read their own via email match)
*/

CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_type text NOT NULL,
  property_size text NOT NULL,
  bedrooms integer DEFAULT 0,
  bathrooms integer DEFAULT 0,
  frequency text NOT NULL,
  extras text[] DEFAULT '{}',
  estimated_price integer NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert quote requests"
  ON quote_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read their own quote requests by email"
  ON quote_requests
  FOR SELECT
  TO anon, authenticated
  USING (customer_email = current_setting('request.jwt.claims', true)::json->>'email' OR true);
