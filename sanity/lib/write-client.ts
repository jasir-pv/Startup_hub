
import 'server-only'

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId,token } from '../env'
import { error } from 'console'

export const wirteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token,
})

if(!wirteClient.config().token){
    throw new Error("Write token not found.")
}
