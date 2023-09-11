import { ChangeEventHandler, FunctionComponent, useMemo } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { setLocaleCookie, uppercaseFirst } from 'core';

import { Select } from '@chakra-ui/react';

const LanguageSwitcher: FunctionComponent = () => {
  const { i18n } = useTranslation();
  const { language: currentLanguage } = i18n;
  const router = useRouter();
  const locales = router.locales ?? [currentLanguage];

  const languageNames = useMemo(() => {
    return new Intl.DisplayNames([currentLanguage], {
      type: 'language',
    });
  }, [currentLanguage]);

  const languageChanged: ChangeEventHandler<HTMLSelectElement> = (e) => {
    router.push(
      {
        pathname: router.pathname,
        query: router.query,
      },
      undefined,
      { locale: e.target.value }
    );
    setLocaleCookie(e.target.value);
  };

  return (
    <Select onChange={languageChanged} width="120px">
      {locales.map((locale) => {
        const label = uppercaseFirst(languageNames.of(locale) ?? locale);
        return (
          <option selected={locale === currentLanguage} key={locale} value={locale}>
            {label}
          </option>
        );
      })}
    </Select>
  );
};

export default LanguageSwitcher;
