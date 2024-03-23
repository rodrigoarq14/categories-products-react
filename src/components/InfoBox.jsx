import '../assets/styles/custom.css';

export const InfoBox = ({withIcon = true, icon = null, iconColor, iconBg, title, content}) => {
  return (
    <div className='info-box'>
        {withIcon && icon && (
            <span className={'info-box-icon bg-' + iconBg  + ' text-' + iconColor + ' elevation-1'}>
                {icon}
            </span>
        )}
        <div className='info-box-content'>
            <span className='info-box-text text-muted'>
                {title}
            </span>
            <span className='info-box-number'>
                {content}
            </span>
        </div>
    </div>
  );
};
