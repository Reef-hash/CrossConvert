import { useEffect } from 'react';
import type { PageMetadata } from '../features/platform/services/metadataService';
import { env } from '../config/env';

const ensureMeta = (selector: string, attribute: string, value: string): HTMLMetaElement => {
  const existing = document.head.querySelector(selector);
  if (existing instanceof HTMLMetaElement) {
    existing.setAttribute(attribute, value);
    return existing;
  }

  const meta = document.createElement('meta');
  meta.setAttribute(attribute, value);
  document.head.appendChild(meta);
  return meta;
};

export const usePageMetadata = (metadata: PageMetadata) => {
  useEffect(() => {
    document.title = metadata.title;
    ensureMeta('meta[name="description"]', 'name', 'description').setAttribute('content', metadata.description);
    ensureMeta('meta[name="keywords"]', 'name', 'keywords').setAttribute('content', metadata.keywords.join(','));

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!(canonical instanceof HTMLLinkElement)) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${env.appUrl}${metadata.canonicalPath}`);

    const existingSchemaScript = document.head.querySelector('script[data-crossconvert-schema="true"]');
    const schemaScript =
      existingSchemaScript instanceof HTMLScriptElement
        ? existingSchemaScript
        : document.createElement('script');

    if (!(existingSchemaScript instanceof HTMLScriptElement)) {
      schemaScript.type = 'application/ld+json';
      schemaScript.dataset.crossconvertSchema = 'true';
      document.head.appendChild(schemaScript);
    }

    schemaScript.textContent = metadata.schema ? JSON.stringify(metadata.schema) : '';
  }, [metadata]);
};
