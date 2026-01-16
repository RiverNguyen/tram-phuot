'use server'

/* eslint-disable @typescript-eslint/no-explicit-any */

interface SubmitTourBookingParams {
  formData: Record<string, any>
  id: string
  unitTag: string
}

export async function submitTourBooking({ formData, id, unitTag }: SubmitTourBookingParams) {
  try {
    if (!id || !unitTag) {
      throw new Error("Both 'id' and 'unitTag' are required.")
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_CF7
    if (!baseUrl) {
      throw new Error('API base URL is not defined in environment variables.')
    }

    const endpoint = `${baseUrl}/${id}/feedback`
    const requestFormData = new FormData()

    // Convert formData object to FormData
    Object.entries(formData).forEach(([key, value]) => {
      requestFormData.append(key, String(value))
    })
    requestFormData.set('_wpcf7_unit_tag', unitTag)

    const response = await fetch(endpoint, {
      method: 'POST',
      body: requestFormData,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error sending CF7 request:', error)
    throw error
  }
}
