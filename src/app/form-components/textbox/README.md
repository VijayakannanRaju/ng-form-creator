# Enhanced Textbox Component

A modern, accessible, and feature-rich textbox component for Angular applications with comprehensive validation support and excellent user experience.

## Features

### Core Features
- **Modern Design**: Clean, professional appearance with smooth animations
- **Accessibility**: Full ARIA support, keyboard navigation, and screen reader compatibility
- **Validation**: Built-in validation with real-time error messages
- **Responsive**: Mobile-friendly design with touch-optimized interactions
- **Customizable**: Extensive styling options and configuration

### Advanced Features
- **Character Count**: Visual feedback for max length inputs
- **Loading State**: Built-in loading spinner for async operations
- **Clear Button**: Optional clear functionality for better UX
- **Readonly Mode**: Support for read-only state
- **Focus Management**: Enhanced focus states and indicators
- **Error Handling**: Comprehensive error display with icons

## Usage

### Basic Usage
```html
<app-textbox 
  [formControlName]="'fieldName'"
  label="Your Label"
  placeholder="Enter your text">
</app-textbox>
```

### With Metadata (Recommended)
```html
<app-textbox 
  [formControlName]="'fieldName'"
  [metadata]="textboxMetadata"
  [label]="textboxMetadata.displayLabel"
  [placeholder]="textboxMetadata.placeholder"
  [required]="textboxMetadata.required"
  [maxLength]="textboxMetadata.maxLength"
  [minLength]="textboxMetadata.minLength">
</app-textbox>
```

### Advanced Usage
```html
<app-textbox 
  [formControlName]="'fieldName'"
  [metadata]="textboxMetadata"
  [loading]="isLoading"
  [readonly]="isReadonly"
  [showClearButton]="true">
</app-textbox>
```

## Input Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `metadata` | `TextboxMetadata` | `undefined` | Complete metadata object for the textbox |
| `label` | `string` | `undefined` | Display label for the textbox |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `required` | `boolean` | `false` | Whether the field is required |
| `maxLength` | `number` | `undefined` | Maximum character limit |
| `minLength` | `number` | `undefined` | Minimum character limit |
| `loading` | `boolean` | `false` | Shows loading spinner |
| `readonly` | `boolean` | `false` | Makes the field read-only |
| `showClearButton` | `boolean` | `false` | Shows clear button when value exists |

## Validation

The component supports the following validation types:

- **Required**: Shows error when field is empty
- **Min Length**: Validates minimum character count
- **Max Length**: Validates maximum character count
- **Custom**: Supports additional validators through FormControl

### Validation Messages
- Required: "{label} is required"
- Min Length: "{label} must be at least {minLength} characters"
- Max Length: "{label} must not exceed {maxLength} characters"

## Accessibility Features

- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Clear focus indicators
- **Keyboard Navigation**: Full keyboard support
- **Error Announcements**: Screen reader announces validation errors
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user's motion preferences

## Styling

The component uses modern CSS with:
- CSS Grid and Flexbox for layout
- CSS Custom Properties for theming
- Smooth transitions and animations
- Mobile-first responsive design
- Dark mode support (ready for implementation)

### CSS Classes
- `.textbox-container`: Main container
- `.textbox-wrapper`: Inner wrapper
- `.textbox-label`: Label element
- `.textbox-input`: Input field
- `.error-message`: Error display
- `.character-count`: Character counter
- `.loading-spinner`: Loading indicator
- `.clear-button`: Clear button

## States

### Visual States
- **Default**: Normal appearance
- **Focused**: Blue border and shadow
- **Invalid**: Red border and error message
- **Disabled**: Grayed out appearance
- **Loading**: Loading spinner and disabled state
- **Readonly**: Grayed background

### Interaction States
- **Hover**: Subtle border color change
- **Focus**: Enhanced focus ring
- **Active**: Button press states
- **Error**: Error styling and messages

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Optimized rendering with OnPush change detection
- Efficient validation updates
- Minimal DOM manipulation
- Lazy loading of optional features

## Examples

### Basic Form Field
```typescript
// Component
export class MyComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)])
  });
}
```

```html
<!-- Template -->
<app-textbox 
  [formControlName]="'name'"
  label="Full Name"
  placeholder="Enter your full name"
  [required]="true"
  [minLength]="2">
</app-textbox>
```

### With Metadata
```typescript
// Component
export class MyComponent {
  textboxMetadata: TextboxMetadata = {
    type: 'TEXTBOX',
    name: 'email',
    displayLabel: 'Email Address',
    displayName: 'Email',
    placeholder: 'Enter your email',
    required: true,
    maxLength: 100,
    iconName: 'textbox.png',
    showMetadataDiv: false
  };
}
```

```html
<!-- Template -->
<app-textbox 
  [formControlName]="'email'"
  [metadata]="textboxMetadata">
</app-textbox>
```

## Migration Guide

### From Old Textbox
1. Replace basic inputs with enhanced component
2. Add metadata support for better configuration
3. Update validation handling
4. Test accessibility features

### Breaking Changes
- None - the component is backward compatible
- New features are opt-in through additional properties

## Contributing

When contributing to this component:
1. Maintain accessibility standards
2. Add comprehensive tests
3. Update documentation
4. Follow the existing code style
5. Test across different browsers and devices 