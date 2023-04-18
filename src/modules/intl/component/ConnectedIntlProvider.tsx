import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducer';
import enMessages from '../en.json';
import viMessages from '../vi.json';
import intlReducer, { IntlState } from '../../../modules/intl/redux/intlReducer';


function getMessages(locale: string): any {
  console.log(locale)
  if (typeof locale === 'string' && locale.startsWith('vi')) {
    console.log("vi")

    return viMessages;
  }
  return enMessages;
}
// getMessages("")

function mapStateToProps(state : AppState) {
  console.log(state);
  return {
    locale: state.intl.locale,
    messages: getMessages(state.intl.locale),
  };
}

// mapStateToProps( )


export {getMessages, mapStateToProps}

export default connect(mapStateToProps)(IntlProvider);
