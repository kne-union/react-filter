import classnames from 'classnames';
import style from './style.module.scss';
import FilterProvider from './FilterProvider';
import { FilterMobileOverrideContext, useDetectFilterIsMobile } from './hooks/useFilterIsMobile';
import useFilterViewportVars from './hooks/useFilterViewportVars';
import { FILTER_CLASS } from './filterClassNames';

const FilterOuter = ({ children, className, isMobile: isMobileProp, ...props }) => {
  const detectedMobile = useDetectFilterIsMobile();
  const isMobile = typeof isMobileProp === 'boolean' ? isMobileProp : detectedMobile;
  const boundaryRef = useFilterViewportVars();

  return (
    <FilterMobileOverrideContext.Provider value={isMobile}>
      <FilterProvider {...props}>
        {context => (
          <div ref={boundaryRef} className={classnames(style['filter'], FILTER_CLASS.root, isMobile && style['is-mobile'], isMobile && FILTER_CLASS.isMobile, className)}>
            {children({ ...context, props, isMobile })}
          </div>
        )}
      </FilterProvider>
    </FilterMobileOverrideContext.Provider>
  );
};

export default FilterOuter;
