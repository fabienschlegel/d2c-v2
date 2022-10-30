---
title: 'Understand and use composition in React'
date: '2021-07-09'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien_schlegel.png'
excerpt: 'Composition is very powerful in React but for some cases, it may be hard to use. Today I will give you examples of composition caught up in real projects.'
tags: ['javascript', 'typescript', 'React']
---

React is a cool library to make front end apps. I work with it since 3 years and I'm not bored to use it !

Composition is very powerful in React but for some cases, it may be hard to use.

Today I will give you examples of composition caught up in real Typescript projects.

## Specialization

Take a very common component, like a button. We have a lot of them in our apps.

Below, a generic component, a button with some props.

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

This component is here only to have a base. Now we can specialize it.

And this is what we get :

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

Now we have a specialized component. As you can see it's a component to download a PDF file. This one have an _onClick_ event, a custom hook and a special display during loading.

Another example of specialization with the same generic button component.

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

This button open a modal from an _onClick_ event, nothing else. It has a special design, which override the generic design of the button.

## Containment

The special children prop is a great way to pass a component as prop.

Look at this example of how we use this.

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

With the React context API, you can add to a batch of related components a store like. Very useful to share data between avoiding props drilling.

Keep the context provider in a wrapper component make it more reusable.

Look at the related component :

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

Our wrapper come at the root and everything else is the children prop.

## Injection

When you pass props, the only way is from parent to child.

But we can inject props in a component with the _cloneElement_ method. I discovered that not very long ago.

Look above and now look the details of the Page component below.

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

We need the _isVisible_ state here, but we want to pass it to a props component which is set higher in the tree.

With _cloneElement_, we can add props, here a method to display the content of the sidebar, to another component.

## Conclusion

Now you can see what we can do with composition in React.

Maybe I don't cover all the possibilities, but if any of us find a new one, he can share it on [Twitter](https://twitter.com/fabienschlegel) !
