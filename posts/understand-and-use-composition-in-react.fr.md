---
title: 'Comprendre et utiliser la composition dans React'
pageTitle: 'Comprendre et utiliser la composition dans React : meilleures pratiques et exemples'
date: '2021-07-09'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
excerpt: 'La composition est très puissante dans React mais pour certains cas, elle peut être difficile à utiliser. Je vais vous donner des exemples de composition pris dans des projets réels.'
tags: ['javascript', 'typescript', 'React']
---

React est une super bibliothèque pour faire des applications frontend. Je travaille avec depuis 3 ans et je ne me lasse pas de l'utiliser !

La composition est très puissante dans React mais dans certains cas, elle peut être difficile à utiliser.

Aujourd'hui, je vais vous donner des exemples de composition dans des projets Typescript réels.

## Spécialisation

Prenons un composant très commun, comme un bouton. Nous en avons beaucoup dans nos applications.

Ci-dessous, un composant générique, un bouton avec quelques propriétés de styles.

```typescript
const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  size,
  color,
  isLoading,
  className,
  ...others
}) => (
  <button
    className={clsx('button', size, color, isLoading ? 'is-loading' : undefined, className)}
    {...others}
  >
    {children}
  </button>
);
```

Ce composant n'est là que pour servir de base. Nous pouvons maintenant le spécialiser.

Et voici ce que nous obtenons :

```typescript
const ExportPdfButton: React.FC<ExportPdfButtonProps> = ({
  url,
  operation,
  reference,
  className,
}) => {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useDownloadPdf(url, operation, reference);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
    e.stopPropagation();
    setLoading(true);
  };

  return (
    <Button
      className={clsx('has-tooltip-arrow', className)}
      onClick={(e) => handleClick(e)}
      data-tooltip={uppercaseFirst(t('downloadPdf'))}
    >
      {isLoading ? (
        <FontAwesomeIcon icon={faSpinner} pulse />
      ) : (
        <FontAwesomeIcon icon={faFilePdf} />
      )}
    </Button>
  );
};
```

Nous avons maintenant un composant spécialisé. Comme vous pouvez le voir, il s'agit d'un composant permettant de télécharger un fichier PDF. Celui-ci dispose d'un événement _onClick_, d'un hook custom et d'un affichage spécial pendant le chargement.

Un autre exemple de spécialisation avec le même composant bouton générique.

```typescript
const ActionsButton: React.FC<ActionsButtonProps> = ({ title, label, type, modalContent }) => {
  const { t } = useTranslation();

  const openModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    ModalService.open({
      onCancel: () => Promise.resolve(true),
      title,
      content: <ModalWrapper>{modalContent}</ModalWrapper>,
    });
  };

  return (
    <Button className={clsx('action-btn large', type)} onClick={openModal}>
      {uppercaseFirst(t(label))}
    </Button>
  );
};
```

Ce bouton ouvre une fenêtre modale à partir d'un événement _onClick_, rien d'autre. Il a un style spécial, qui remplace le style générique du bouton.

## Confinement

La propriété spéciale `children` est un excellent moyen de passer un composant en tant que propriété.

Regardez cet exemple d'utilisation.

```typescript
const ContextWrapper: React.FC<ContextWrapperProps> = ({ children }) => {
  const [itemsState, dispatchitems] = useReducer(itemsReducer, itemsInitialState);
  const [filtersState, dispatchFilters] = useReducer(filtersReducer, filtersInitialState);
  return (
    <ItemsContext.Provider value={{ state: itemsState, dispatch: dispatchitems }}>
      <FiltersContext.Provider value={{ state: filtersState, dispatch: dispatchFilters }}>
        {children}
      </FiltersContext.Provider>
    </ItemsContext.Provider>
  );
};
```

Avec l'API context de React, vous pouvez ajouter à un lot de composants un store équivalent à Redux. Très utile pour partager des données entre des composants en évitant le props drilling.

Garder le fournisseur de contexte dans un composant wrapper le rend plus réutilisable.

Regardez le composant connexe :

```typescript
const Items: React.FC = () => {
  const { elementId } = useParams<RouteParams>();
  const [element] = useElement(elementId);

  return (
    <ContextWrapper>
      {element && (
        <Page
          filtersComponent={<Filters />}
          actionsPanel={<ItemsActionsPanel element={element} />}
          dataTable={<ItemsTable />}
        />
      )}
    </ContextWrapper>
  );
};
```

Notre wrapper vient à la racine et tout le reste est la propriété `children`.

## Injection

Lorsque vous passez des props, le seul moyen est de passer du parent à l'enfant.

Mais on peut injecter des props dans un composant avec la méthode _cloneElement_. J'ai découvert cela il n'y a pas très longtemps.

Regardez ci-dessus et maintenant regardez les détails du composant Page ci-dessous.

```typescript
const Page: React.FC<PageProps> = ({ filtersComponent, actionsPanel, dataTable }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { t } = useTranslation();

  const toggleSideBar = () => {
    setIsVisible(!isVisible);
  };

  const actionsPanelWithProps = React.Children.map(actionsPanel, (child, i) => {
    return React.cloneElement(child, {
      toggleSideBar,
      index: i,
    });
  });

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="site-content">
        <SideBar
          title={uppercaseFirst(t('filters'))}
          isVisible={isVisible}
          toggleSideBar={toggleSideBar}
        >
          {filtersComponent}
          <ResetFiltersButton isFullWidth />
        </SideBar>
        <div className={Style.container}>
          {actionsPanelWithProps}
          {dataTable}
        </div>
      </main>
      {filtersComponent ? <ModalProvider /> : null}
    </>
  );
};
```

Nous avons besoin de l'état _isVisible_ ici, mais nous voulons le passer à un composant qui est placé plus haut dans l'arbre.

Avec _cloneElement_, nous pouvons ajouter des props, ici une méthode pour afficher le contenu de la barre latérale, à un autre composant.

## Conclusion

Vous pouvez maintenant voir ce que nous pouvons faire avec la composition dans React.
