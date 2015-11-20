package com.feedme.activities;

import android.app.Activity;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;

import com.feedme.R;

public class Main extends Activity
{
    WebView mBrowser;
    ProgressBar mLoading;

    // Default app endpoint
    static final String DEFAULT_ENDPOINT = "https://feedme-app.herokuapp.com/";

    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        // Call super
        super.onCreate(savedInstanceState);

        // Load UI elements
        initializeUI();

        // Load UI elements
        initializeBrowser();
    }

    void initializeUI()
    {
        // Set default layout
        setContentView(R.layout.main);

        // Get browser view
        mBrowser = (WebView)findViewById(R.id.browser);

        // Get progress bar view
        mLoading = (ProgressBar)findViewById(R.id.loading);
    }

    @Override
    public void onBackPressed()
    {
        // Can we go back?
        if ( mBrowser.canGoBack() )
        {
            // Go back a page
            mBrowser.goBack();
        }
        else
        {
            // Close activity
            super.onBackPressed();
        }
    }

    void initializeBrowser()
    {
        // Allow JS
        mBrowser.getSettings().setJavaScriptEnabled(true);

        // Set cache mode
        //mBrowser.getSettings().setCacheMode(WebSettings.LOAD_);

        // Handle loading
        mBrowser.setWebViewClient(new WebViewClient()
        {
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon)
            {
                // Call super function
                super.onPageStarted(view, url, favicon);

                // Show loading indicator
                toggleLoading(true);
            }

            @Override
            public void onPageFinished(WebView view, String url)
            {
                // Call super function
                super.onPageFinished(view, url);

                // Hide loading indicator
                toggleLoading(false);
            }
        });

        // Load app URL
        mBrowser.loadUrl(getApplicationEndpoint());
    }

    private String getApplicationEndpoint()
    {
        // Get it from shared preferences
        return PreferenceManager.getDefaultSharedPreferences(this).getString("app_endpoint", DEFAULT_ENDPOINT);
    }

    void toggleLoading(boolean value)
    {
        // Currently, only support hide
        if ( ! value )
        {
            // Hide loading
            mLoading.setVisibility(View.GONE);

            // Show browser
            mBrowser.setVisibility(View.VISIBLE);
        }
    }

    @Override
    protected void onPause()
    {
        // Call super function
        super.onPause();

        // Call browser's onPause as well
        invokeBrowserMethod("onPause");
    }

    @Override
    protected void onResume()
    {
        // Call super function
        super.onResume();

        // Call browser's onResume as well
        invokeBrowserMethod("onResume");
    }

    void invokeBrowserMethod(String Method)
    {
        try
        {
            // Call the method via reflection
            Class.forName("android.webkit.WebView").getMethod(Method, (Class[]) null).invoke(mBrowser, (Object[]) null);
        }
        catch( Exception Exc )
        {
            // Log the error
            Log.e(getString(R.string.app_name), Exc.getMessage());
        }
    }
}
