// M06 Consent state: reads/writes pdca.consent.v1 and switches tracking (M28) on or off.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { consentSnapshot, subscribeConsent, writeConsent, type ConsentChoice } from "~/lib/consent";
import { setTrackingConsent } from "~/lib/track";

interface ConsentState {
  /** undefined while pre-rendering / hydrating; null = no choice stored yet. */
  choice: ConsentChoice | null | undefined;
  bannerOpen: boolean;
  bannerHeight: number;
  setBannerHeight: (h: number) => void;
  accept: () => void;
  decline: () => void;
  openSettings: () => void;
  /** Goes up each time "Cookie settings" is used, so the banner can take focus and highlight itself. */
  settingsRequest: number;
}

const ConsentContext = createContext<ConsentState | null>(null);
const serverSnapshot = () => undefined;

export function ConsentProvider({ children }: { children: ReactNode }) {
  const choice = useSyncExternalStore(subscribeConsent, consentSnapshot, serverSnapshot);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(0);
  const [settingsRequest, setSettingsRequest] = useState(0);
  // The "Cookie settings" button that reopened the banner: focus goes back to it after a choice.
  const returnFocus = useRef<HTMLElement | null>(null);

  const closeSettings = useCallback(() => {
    setSettingsOpen(false);
    const el = returnFocus.current;
    returnFocus.current = null;
    if (el?.isConnected) window.setTimeout(() => el.focus(), 0);
  }, []);

  // Keep the tracking module in sync with the stored choice. Denied / none also clears local IDs.
  useEffect(() => {
    if (choice !== undefined) setTrackingConsent(choice === "granted");
  }, [choice]);

  const accept = useCallback(() => {
    writeConsent("granted");
    closeSettings();
  }, [closeSettings]);

  const decline = useCallback(() => {
    writeConsent("denied");
    closeSettings();
  }, [closeSettings]);

  const openSettings = useCallback(() => {
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSettingsOpen(true);
    setSettingsRequest((n) => n + 1);
  }, []);

  const bannerOpen = choice === null || (choice !== undefined && settingsOpen);

  const value = useMemo(
    () => ({ choice, bannerOpen, bannerHeight, setBannerHeight, accept, decline, openSettings, settingsRequest }),
    [choice, bannerOpen, bannerHeight, accept, decline, openSettings, settingsRequest],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

const noop = () => {};
const FALLBACK: ConsentState = {
  choice: undefined,
  bannerOpen: false,
  bannerHeight: 0,
  setBannerHeight: noop,
  accept: noop,
  decline: noop,
  openSettings: noop,
  settingsRequest: 0,
};

export function useConsent(): ConsentState {
  return useContext(ConsentContext) ?? FALLBACK;
}
