"use client";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

function pushDataLayerEvent(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

type TrackedCallLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  placement: "header-mobile" | "header-desktop" | "footer";
  children: ReactNode;
};

export function TrackedCallLink({ placement, onClick, children, ...props }: TrackedCallLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        onClick?.(event);
        pushDataLayerEvent({
          event: "click_to_call",
          call_placement: placement,
          method: "phone",
          phone_number: "(913) 782-6311",
          page_path: window.location.pathname,
          page_location: window.location.href,
        });
      }}
    >
      {children}
    </a>
  );
}

type TrackedEmailLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  placement: "header" | "footer";
  children: ReactNode;
};

export function TrackedEmailLink({
  placement,
  onClick,
  children,
  ...props
}: TrackedEmailLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        onClick?.(event);
        pushDataLayerEvent({
          event: "click_to_email",
          email_placement: placement,
          method: "email",
          email_address: "builtbydesign@builtbydesignkc.com",
          page_path: window.location.pathname,
          page_location: window.location.href,
        });
      }}
    >
      {children}
    </a>
  );
}

type ScrollToFormButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  ctaName: string;
  source: string;
  children: ReactNode;
};

export function ScrollToFormButton({
  ctaName,
  source,
  onClick,
  children,
  ...props
}: ScrollToFormButtonProps) {
  return (
    <button
      {...props}
      onClick={(event) => {
        onClick?.(event);
        pushDataLayerEvent({
          event: "cta_click",
          cta_name: ctaName,
          page_path: window.location.pathname,
          page_location: window.location.href,
        });
        pushDataLayerEvent({
          event: "scroll_to_form",
          source,
          page_path: window.location.pathname,
          page_location: window.location.href,
        });
        const target = document.getElementById("lead-form");
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
    >
      {children}
    </button>
  );
}

type OpenCookieSettingsButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function OpenCookieSettingsButton({
  onClick,
  children,
  ...props
}: OpenCookieSettingsButtonProps) {
  return (
    <button
      {...props}
      onClick={(event) => {
        onClick?.(event);
        window.dispatchEvent(new Event("open-cookie-consent"));
      }}
    >
      {children}
    </button>
  );
}

