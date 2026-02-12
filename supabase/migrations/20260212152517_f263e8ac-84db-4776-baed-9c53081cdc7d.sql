-- Add UPDATE policy for receipts bucket to allow upsert
CREATE POLICY "Anyone can update receipts"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'receipts')
WITH CHECK (bucket_id = 'receipts');

-- Add DELETE policy too in case re-uploads are needed
CREATE POLICY "Anyone can delete receipts"
ON storage.objects
FOR DELETE
USING (bucket_id = 'receipts');