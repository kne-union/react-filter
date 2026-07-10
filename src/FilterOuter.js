import classnames from 'classnames';
import { RESPONSIVE_BOUNDARY_CLASS } from '@kne/responsive-utils';
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
        <div ref={boundaryRef} className={classnames(style['filter'], 'filter', RESPONSIVE_BOUNDARY_CLASS, isMobile && style['is-mobile'], className)}>
          {children({ ...context, props })}
        </div>
      )}
    </FilterProvider>
  );
};

export default FilterOuter;
