import classnames from 'classnames';
import style from './style.module.scss';
import FilterProvider from './FilterProvider';
import useFilterIsMobile from './hooks/useFilterIsMobile';
import useFilterViewportVars from './hooks/useFilterViewportVars';

const FilterOuter = ({ children, className, ...props }) => {
  const isMobile = useFilterIsMobile();
  const boundaryRef = useFilterViewportVars();

  return (
    <FilterProvider {...props}>
      {context => (
        <div ref={boundaryRef} className={classnames(style['filter'], 'filter', isMobile && style['is-mobile'], className)}>
          {children({ ...context, props })}
        </div>
      )}
    </FilterProvider>
  );
};

export default FilterOuter;
