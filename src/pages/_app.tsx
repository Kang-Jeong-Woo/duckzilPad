import '@/styles/globals.css'
import {Provider} from "react-redux";
import store from "@/store/store";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { CookiesProvider } from 'react-cookie';
import {BindingSpring} from "../components/UI/BindingSpring";
import {AppProps} from "next/app";
config.autoAddCss = false

export default function App({ Component, pageProps }:AppProps) {
    return(
        <>
            <CookiesProvider>
                <Provider store={store}>
                    <BindingSpring/>
                    <Component {...pageProps}/>
                    <div id={"overlay-root"}></div>
                </Provider>
            </CookiesProvider>
        </>
    )
}