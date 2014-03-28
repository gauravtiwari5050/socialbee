Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook,'441418952627346','fee9359b332e965603b8e8efbb564407',:scope => 'publish_stream'
end
